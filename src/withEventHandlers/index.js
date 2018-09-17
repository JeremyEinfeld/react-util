import React, { PureComponent } from 'react';

export function withEventHandlers(eventHandlers, Component) {
	return class WithEventHandlers extends PureComponent {
		static displayName = `WithEventHandlers(${Component.displayName ||
			Component.name ||
			'Unnamed Component'})`;

		constructor(props) {
			super(props);

			this.eventHandlers = Object.entries(eventHandlers)
				.map(([key, value]) => ({
					[key]: (...args) => value(this.props, ...args),
				}))
				.reduce((a, b) => Object.assign(a, b), {});
		}

		render() {
			return <Component {...this.props} {...this.eventHandlers} />;
		}
	};
}
