import React from 'react';
import SimpleDropdown from '../fragments/SimpleDropdown';
import SearchSortOptionsList from '../staticJson/searchSortOptionsList';
import SearchData from '../stores/SearchData';

const searchData = new SearchData();
export default class SortDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.changeSearchSort = this.changeSearchSort.bind(this);
  }

  changeSearchSort(value) {
    searchData.setValue("start", 0);
    searchData.setValue("sort", value);
    this.props.searchCallback();
  }

  render() {
    var current_sort = searchData.getValue("sort");
    var sort_lbl = 'Sort by ';
    const sort_options = [];

    const changeSearchSortVar = this.changeSearchSort;
    SearchSortOptionsList.searchSortOptions.forEach(function(row) {
      if (current_sort == row.value) {
        sort_lbl += row.label;
      }
      sort_options.push({
        customAnchor: true, display: <a title={row.label} className='clickable' onClick={() => changeSearchSortVar(row.value)}>{row.label}</a>
      });
    });
    return (
      <div className='search-sort-dropdown'>
        <SimpleDropdown noBtnPadding items={sort_options} label={sort_lbl}/>
      </div>
    );
  }

}
