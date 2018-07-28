import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'
import { titleCase } from 'change-case'

import './DescriptionNav.less'

class DescriptionNav extends React.Component {

  render() {
    let { navOptions, toggleAction, activeGroup, label, cursorClass } = this.props

    return (
      <div
        class="description-nav form-group"
      >
        <label class="form-label">
          {titleCase(label)}
        </label>
        <ul
          class={!!cursorClass ? `nav nav-pills nav-justified ${cursorClass}` : "nav nav-pills nav-justified"}
        >
          {navOptions.map((opt) =>
            <li
              class={(activeGroup === opt) ? "active" : ""}
              key={opt}
            >
              <a
                onClick={() => toggleAction(opt)}
              >
                {titleCase(opt)}
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default DescriptionNav
