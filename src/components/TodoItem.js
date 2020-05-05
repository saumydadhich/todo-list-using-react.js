import React from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
  getStyle = () => {
    return{
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    }
  }

  btnStyle = () => {
    return{
      background: '#ff0000',
      color: '#fff',
      border: 'none',
      padding: '5px 9px',
      borderRadius: '50%',
      cursor: 'pointer',
      float: 'right'
    }
  }

  render () {
    const {id, title} = this.props.todo;
    return(
      <div style = {this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
          {title}
          <button style={this.btnStyle()} onClick={this.props.delItem.bind(this, id)}>X</button>
        </p>
      </div>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

const itemStyle = {
  backgroundColor: '#f4f4f4'
}

export default TodoItem;
