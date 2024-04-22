using Umbraco.Cms.Core.DeliveryApi;
using Umbraco.Cms.Core.Models;

namespace UmbracoHeadlessSandbox.Umbraco.Filters
{
    /// <summary>
    /// Usage: umbracoNaviHide:True or umbracoNaviHide:False on filter for API:  
    /// filter: ["umbracoNaviHide:False"]
    /// </summary>
    public class UmbracoNaviHideFilter : IFilterHandler, IContentIndexHandler
    {
        private const string _specifier = "umbracoNaviHide:";
        private const string _fieldName = "umbracoNaviHide";

        public bool CanHandle(string query)
            => query.StartsWith(_specifier, StringComparison.OrdinalIgnoreCase);

        public FilterOption BuildFilterOption(string filter)
        {
            var fieldValue = filter[_specifier.Length..];
            var values = fieldValue.Split(',');
            return new FilterOption { FieldName = _fieldName, Values = values, Operator = FilterOperation.Is };
        }

        public IEnumerable<IndexFieldValue> GetFieldValues(IContent content, string? culture)
        {
            var umbracoNaviHide = content.GetValue<bool?>(_fieldName);
            return umbracoNaviHide is null
                ? ([])
                : ([new IndexFieldValue { FieldName = _fieldName, Values = [umbracoNaviHide] }]);
        }

        public IEnumerable<IndexField> GetFields() =>
            [new IndexField { FieldName = _fieldName, FieldType = FieldType.StringRaw, VariesByCulture = false }];
    }
}