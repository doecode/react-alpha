import React from 'react';
export default class ContributingOrgItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.items.map((row,index)=>
          <div key={index}>
            {row.organization_name}&nbsp;({row.contributor_type})
          </div>
        )}
      </div>
    );
  }
}
