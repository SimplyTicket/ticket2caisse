import type GlitchedArc from "@/components/icons/GlitchedArc.vue";

export interface GlitchConfig {
  layers: number;
  intensity: number;
  jitterRadius: number;
  jitterDegree: number;
  jitterWidth: number;
  jitterOffset: number;
  colorShift: number;
  animate: boolean;
  speed: number;
  mode: "random" | "alternating" | "progressive";
  dashPattern?: string;
  width: [number, number]; // base width range
  numberOfGroups: number;
}

// Shared parameters for ALL shapes
export interface BaseGlitchParams {
  key: number;
  width: number;          // stroke width / line thickness
  length: number;         // unified: arc sweep (deg) OR line length
  offset: number;         // angular/positional offset
  hueRotate: number;      // CSS filter shift
  opacity: number;
  dashPattern?: string;
}

// 🔹 Arc-specific
export interface GlitchArc extends BaseGlitchParams {
  type: "arc";
  radius: number;
  startAngle: number;
}

// 🔹 Line-specific
export interface GlitchLine extends BaseGlitchParams {
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type GlitchShape = GlitchArc | GlitchLine;

// Brain
// Descripbe the idea of having multiple small same elements around the base element
abstract class Glitch<Shape extends BaseGlitchParams> {
	protected rng: () => number;

	constructor(
		protected config: GlitchConfig,
		seed: number,
	) {
		let s = seed;
		this.rng = function () {
			var t = (s += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	protected sRand(min: number, max: number): number {
		return this.rng() * (max - min) + min;
	}

	protected clamp(val: number, min: number, max: number): number {
		return Math.min(max, Math.max(min, val));
	}

	// Apply config intensity to a jitter range
	protected applyJitter(base: number, jitterRange: number): number {
		return base + this.sRand(-jitterRange, jitterRange) * this.config.intensity;
	}

	// Optional: mode-based staggering helper
	protected getProgressiveOffset(index: number, total: number): number {
		switch (this.config.mode) {
			case "alternating":
				return index % 2 === 0 ? 0 : 180;
			case "progressive":
				return (index / total) * 360;
			default:
				return this.sRand(0, 360);
		}
	}

	abstract generate(): Shape[];
}

export class GlitchArcGenerator extends Glitch<GlitchArc> {
	constructor(config: GlitchConfig, seed: number) {
		super(config, seed);
	}

	generate(): GlitchArc[] {
		const elements: GlitchArc[] = [];
		const [widthMin, widthMax] = this.config.width;

		for (let i = 0; i < this.config.layers; i++) {
			const baseSweep = 95; // or pull from config
			const jitteredLength = this.applyJitter(
				baseSweep,
				this.config.jitterDegree,
			);
			const jitteredWidth =
				this.sRand(widthMin, widthMax) +
				this.applyJitter(0, this.config.jitterWidth);
			const jitteredOffset = this.applyJitter(0, this.config.jitterOffset);

			elements.push({
				key: i,
				type: "arc",
				width: this.clamp(jitteredWidth, 1, Infinity),
				length: this.clamp(jitteredLength, 0, 360),
				offset:
					jitteredOffset + this.getProgressiveOffset(i, this.config.layers),
				hueRotate: this.sRand(-this.config.colorShift, this.config.colorShift),
				opacity: this.sRand(0.4, 1),
				dashPattern: this.config.dashPattern,
				radius: 30,
				startAngle: 0,
			});
		}
		return elements;
	}
}
