import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
          />
          <meta name="naver-site-verification" content="7f6b42606d309ad47db64e1426c6dff7bd7bdecd" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
          {/*<script*/}
          {/*  data-name="BMC-Widget"*/}
          {/*  data-cfasync="false"*/}
          {/*  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"*/}
          {/*  data-id="noah0316"*/}
          {/*  data-description="Support me on Buy me a coffee!"*/}
          {/*  data-message=""*/}
          {/*  data-color="#40DCA5"*/}
          {/*  data-position="Right"*/}
          {/*  data-x_margin="18"*/}
          {/*  data-y_margin="18"*/}
          {/*></script>*/}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
