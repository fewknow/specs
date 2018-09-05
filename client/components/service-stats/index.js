
import React, { Component } from 'react';
import moment from 'moment';
import classname from 'classname';
import styles from './index.css';

export default class ServiceStats extends Component {
  render() {
    const { service } = this.props;
    const { runningCount, desiredCount } = service;
    const { image } = this.props.service.task.containerDefinitions[0].image.substring(0,this.props.service.task.containerDefinitions[0].image.indexOf(':'));
    const { commit } = this.props.service.task.containerDefinitions[0].image.substring(this.props.service.task.containerDefinitions[0].image.indexOf(':')+1);
    const date = moment(service.deployments[0].updatedAt);
    const updatedAgo = date.fromNow();
    const updatedIso = date.toISOString();
    const classes = classname({
      [styles.ServiceStats]: true,
      [styles['ServiceStats--left-aligned']]: this.props.left
    });
    return (
      <div className={classes}>
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <td title={image}>{image}</td>
              <td title={image}>this.props.service.task.containerDefinitions[0].image.substring(0,this.props.service.task.containerDefinitions[0].image.indexOf(':'))</td>
            </tr>
            <tr>
              <th>Commit</th>
              <td title={commit}>{commit}</td>
              <td title={commit}>this.props.service.task.containerDefinitions[0].image.substring(this.props.service.task.containerDefinitions[0].image.indexOf(':')+1)</td>
            </tr>
            <tr>
              <th>Running</th>
              <td title={`${runningCount} out of ${desiredCount}`}>
                {runningCount} out of {desiredCount}
              </td>
            </tr>
            <tr>
              <th>Updated</th>
              <td title={updatedIso}>
                <time dateTime={updatedIso}>{updatedAgo}</time>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
