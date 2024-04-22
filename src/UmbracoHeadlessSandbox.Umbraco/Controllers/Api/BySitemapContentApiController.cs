using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Cms.Api.Delivery.Controllers.Content;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.DeliveryApi;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.DeliveryApi;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services.OperationStatus;

namespace Umbraco.Cms.Api; 
//IMPORTANT: required for operationid to work, changes in V14 via PR: https://github.com/umbraco/Umbraco-CMS/pull/15771

[ApiVersion("2.0")]
public class BySitemapContentApiController(
    IApiPublishedContentCache apiPublishedContentCache,
    IApiContentResponseBuilder apiContentResponseBuilderBuilder,
    IApiContentQueryService apiContentQueryService,
    IRequestMemberAccessService requestMemberAccessService)
    : ContentApiControllerBase(apiPublishedContentCache, apiContentResponseBuilderBuilder)
{
    private readonly IRequestMemberAccessService _requestMemberAccessService = requestMemberAccessService;
    private readonly IApiContentQueryService _apiContentQueryService = apiContentQueryService;

    [HttpGet]
    [MapToApiVersion("2.0")]
    [ProducesResponseType(typeof(PagedViewModel<IApiContentResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Route("BySitemap")]
    public async Task<IActionResult> BySitemap()
        => await HandleRequest();

    private async Task<IActionResult> HandleRequest()
    {
        ProtectedAccess protectedAccess = await _requestMemberAccessService.MemberAccessAsync();

        // TODO: add query into searching. 
        // possibly using a different query method

        //  Attempt<PagedModel<Guid>, ApiContentQueryOperationStatus> queryAttempt = _apiContentQueryService.ExecuteQuery("/", null, null, );

        //  if (queryAttempt.Success is false)
        //  {
        //      return ApiContentQueryOperationStatusResult(queryAttempt.Status);
        //  }

        PagedModel<Guid> pagedResult = new PagedModel<Guid>();//queryAttempt.Result;
        IEnumerable<IPublishedContent> contentItems = ApiPublishedContentCache.GetByIds(pagedResult.Items);
        IApiContentResponse[] apiContentItems = contentItems.Select(ApiContentResponseBuilder.Build).WhereNotNull().ToArray();

        var model = new PagedViewModel<IApiContentResponse>
        {
            Total = pagedResult.Total,
            Items = apiContentItems
        };

        return Ok(model);
    }
}
