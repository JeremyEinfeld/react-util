/* globals describe, it */
import { createDerivedValue } from '..';
import assert from 'assert';

describe('createDerivedValue', () => {
	it('caches results', () => {
		let times = 0;

		const computeState = (firstValue, secondValue) => {
			++times;
			return {
				firstValue,
				secondValue,
				times,
			};
		};

		let firstCacheKey = 'apple';
		let secondCacheKey = 'banana';

		const memoized = createDerivedValue(props => [firstCacheKey, secondCacheKey], computeState);

		assert.equal(1, memoized().times);
		assert.equal(1, memoized().times);
		assert.equal(firstCacheKey, memoized().firstValue);
		assert.equal(secondCacheKey, memoized().secondValue);

		firstCacheKey = 'carrot';

		assert.equal(2, memoized().times);
		assert.equal(2, memoized().times);
		assert.equal(firstCacheKey, memoized().firstValue);
		assert.equal(secondCacheKey, memoized().secondValue);

		firstCacheKey = 'apple';

		assert.equal(3, memoized().times);
		assert.equal(3, memoized().times);
		assert.equal(firstCacheKey, memoized().firstValue);
		assert.equal(secondCacheKey, memoized().secondValue);
	});

	it('rejects keys that do not round trip', () => {
		class Foo {}

		assert.throws(() => createDerivedValue(props => [new Foo()], () => { }));
		assert.doesNotThrow(() => createDerivedValue(props => [1], () => { }));
		assert.doesNotThrow(() => createDerivedValue(props => [{}], () => { }));
	})
});
