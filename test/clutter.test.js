import chai from 'chai';
import c from '../lib/clutter.js';

const expect = chai.expect;
const assert = chai.assert;

describe('c', function() {
	it('chaining', function () {
		assert.equal(c("jees").val, "jees");
		assert.equal(c(1).val, 1);
		assert.equal(c("jees").add("jees").val, "jeesjees");
		assert.equal(c("lorem").add(" ").add("ipsum").val, "lorem ipsum");
	});
});

describe('shuffle', function() {
	it('default', function () {
		const val = "1234567890123456789012345678901234567890";
		expect(c(val).shuffle().val).to.not.equal(val);
	});

	it('words', function () {
		const val = "hello world hello world hello world hello world hello world hello world hello world hello world hello world";
		expect(c(val).shuffle("words").val).to.not.equal(val);
	});

	it('chars', function () {
		const val = "hello world hello world hello world hello world hello world hello world hello world hello world hello world";
		expect(c(val).shuffle("chars").val).to.not.equal(val);
	});
});

describe('random', function() {
	it('syntax', function () {
		assert.equal(c("{1|1|1}").random().val, "1");
		assert.equal(c("{{1|1}|{1|1}|{1|1}}").random().val, "1");
		assert.equal(c("{{{1|1}|{1|1}}|{{1|1}|{1|1}}|{{1|1}|{1|1}}}").random().val, "1");
	});
});

describe('replace', function() {
	it('one', function () {
		assert.equal(c("no").replace({"no": "yes"}).val, "yes");
		assert.equal(c("no no yes").replace({"no": "yes"}).val, "yes yes yes");
	});

	it('multiple', function () {
		assert.equal(c("no").replace({"n": "y", "o": "es"}).val, "yes");
	});

	it('regexp-like string', function () {
		assert.equal(c("*").replace({"*": "ok"}).val, "ok");
	});
});

describe('times', function() {
	it('repeat 5 times', function () {
		assert.equal(c("{1|2|3}").times(5).val, "{1|2|3}{1|2|3}{1|2|3}{1|2|3}{1|2|3}");
	});

	it('repeat after repeat', function () {
		assert.equal(c("1").times(2).times(2).val, "1111");
		assert.equal(c("a").times(3).add("1").add("b").times(3).val, "aaa1b1b1b");
	});

	it('multiple repeats', function () {
		const value = c("1").times(1).add("2").times(2).add("3").times(3).val;

		assert.equal((value.match(/1/g) || []).length, 1);
		assert.equal((value.match(/2/g) || []).length, 2);
		assert.equal((value.match(/3/g) || []).length, 3);
	});
});

describe('chain combinations', function() {
	it('repeated string + random', function () {
		assert.equal(c("{1|1}").times(5).random().val, "11111");
	});

	it('word shuffle + random', function () {
		assert.equal(c("{1|2|3}").times(5).val, "{1|2|3}{1|2|3}{1|2|3}{1|2|3}{1|2|3}");
	});
});
