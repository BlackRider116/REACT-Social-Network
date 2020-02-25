import React from "react";
import classes from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  };

  activatedEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  deactivatedEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusChange = ev => {
    this.setState({
      status: ev.currentTarget.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.status !== this.state.status) {
      this.setState({
        status: this.props.status
      });
    }
  }

  render() {
    return (
      <div className={classes.item}>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activatedEditMode}>
              {this.state.status || 'No status'}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              onBlur={this.deactivatedEditMode}
              autoFocus={true}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
