import { readInputByLines, type Position } from '../utils/index.ts';

type Robot = {
	position: Position;
	velocity: Position;
};

// given in the statement
const TIME = 100;
const MAP_WIDTH = 101;
const MAP_HEIGHT = 103;

const parseInput = (lines: string[]): Robot[] => {
	return lines.map((line) => {
		// biome-ignore lint/style/noNonNullAssertion: it will always match
		const [px, py, vx, vy] = line.match(/-?\d+/g)!.map(Number);

		return {
			position: { x: px, y: py },
			velocity: { x: vx, y: vy },
		};
	});
};

const futurePosition = (robot: Robot, time: number): Position => {
	const finalPosition = {
		x: (robot.position.x + robot.velocity.x * time) % MAP_WIDTH,
		y: (robot.position.y + robot.velocity.y * time) % MAP_HEIGHT,
	};

	if (finalPosition.x < 0) {
		finalPosition.x = MAP_WIDTH + finalPosition.x;
	}

	if (finalPosition.y < 0) {
		finalPosition.y = MAP_HEIGHT + finalPosition.y;
	}

	return finalPosition;
};

const calculateSafetyFactor = (robots: Robot[]): number => {
	const quadrants = [0, 0, 0, 0];

	robots
		.map((r) => futurePosition(r, TIME))
		.forEach((r) => {
			if (r.x < (MAP_WIDTH - 1) / 2 && r.y < (MAP_HEIGHT - 1) / 2) {
				quadrants[0] += 1;
			} else if (r.x > (MAP_WIDTH - 1) / 2 && r.y < (MAP_HEIGHT - 1) / 2) {
				quadrants[1] += 1;
			} else if (r.x < (MAP_WIDTH - 1) / 2 && r.y > (MAP_HEIGHT - 1) / 2) {
				quadrants[2] += 1;
			} else if (r.x > (MAP_WIDTH - 1) / 2 && r.y > (MAP_HEIGHT - 1) / 2) {
				quadrants[3] += 1;
			}
		});

	return quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3];
};

const main = (): void => {
	const robots = parseInput(readInputByLines('./inputs/main.txt'));
	const safetyFactor = calculateSafetyFactor(robots);

	console.log('result day 14, part 1:', safetyFactor); // 233709840
};

main();
