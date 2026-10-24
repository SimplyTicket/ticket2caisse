// https://www.4rknova.com/blog/2026/03/01/mulberry32-rng

// Usage example 
// const rngA = createMulberry32(123456789);
// const rngB = createMulberry32(123456789); // same seed as rngA
 
// console.log(rngA.float());
// console.log(rngA.int(10));
// console.log(rngA.range(-1, 1));
// console.log(rngA.bool(0.25));
// console.log(rngA.pick(["red", "green", "blue"]));
// console.log(rngA.shuffle([1, 2, 3, 4, 5]));
 
// // Not in lockstep: rngA already consumed values.
// console.log(rngA.float() === rngB.float()); // false
 
// // Lockstep check with fresh instances.
// const a = createMulberry32(123456789);
// const b = createMulberry32(123456789);
// console.log(a.float() === b.float()); // true
// console.log(a.float() === b.float()); // true
// console.log(a.float() === b.float()); // true






export default function createMulberry32(seed: number) {
	let state = seed >>> 0; // mutable uint32 state

	const nextFloat = () => {
		state = (state + 0x6d2b79f5) >>> 0; // deterministic state step
		let x = Math.imul(state ^ (state >>> 15), state | 1);
		x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
		return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
	};

	return {
		float() {
			return nextFloat();
		},

		int(maxExclusive: number) {
			if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
				throw new Error("int(maxExclusive) needs a positive integer");
			}
			// Uniform integer in [0, maxExclusive).
			return Math.floor(nextFloat() * maxExclusive);
		},

		range(minInclusive: number, maxExclusive: number) {
			if (!Number.isFinite(minInclusive) || !Number.isFinite(maxExclusive)) {
				throw new Error("range(min, max) needs finite numbers");
			}
			if (!(maxExclusive > minInclusive)) {
				throw new Error("range(min, max) requires max > min");
			}
			return minInclusive + nextFloat() * (maxExclusive - minInclusive);
		},

		bool(p = 0.5) {
			if (p < 0 || p > 1) {
				throw new Error("bool(p) requires 0 <= p <= 1");
			}
			return nextFloat() < p;
		},

		pick(array: Array<any>) {
			if (!Array.isArray(array) || array.length === 0) {
				throw new Error("pick(array) needs a non-empty array");
			}
			return array[this.int(array.length)];
		},

		shuffle(array: Array<any>) {
			if (!Array.isArray(array)) {
				throw new Error("shuffle(array) needs an array");
			}
			const out = array.slice();
			// Fisher-Yates shuffle driven by this seeded RNG.
			for (let i = out.length - 1; i > 0; i -= 1) {
				const j = this.int(i + 1);
				[out[i], out[j]] = [out[j], out[i]];
			}
			return out;
		},

		getState() {
			return state >>> 0;
		},

		setState(nextState: number) {
			state = nextState >>> 0;
		},
	};
}
