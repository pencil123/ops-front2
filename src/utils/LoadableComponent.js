import React from "react";
import Loadable from "react-loadable";
import * as bs from "react-bootstrap";

/**
 *
 * @param {*} component
 * @param {*} haveLoading  组件加载时是否有loading效果
 */
const LoadableComponent = (component) => {
  return Loadable({
    loader: () => component,
    loading: () => {
        return (
          <bs.Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </bs.Spinner>
        );
    },
    dekay: 5000,
  });
};

export default LoadableComponent;
