import React, { useState, useRef } from 'react';

const BacktrackingVisualizer = () => {
    // Initial maze: 0 = open path, 1 = wall, 2 = start, 3 = end
    const initialMaze = [
        [2, 0, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 3]
    ];

    const [maze, setMaze] = useState(initialMaze);
    const [path, setPath] = useState([]);
    const [visited, setVisited] = useState(new Set());
    const [currentPos, setCurrentPos] = useState({ row: 0, col: 0 });
    const [isSearching, setIsSearching] = useState(false);
    const [pathFound, setPathFound] = useState(false);
    const [message, setMessage] = useState('Click "Start Search" to begin pathfinding');
    const [stepCount, setStepCount] = useState(0);

    // Refs to store current state during algorithm execution
    const pathRef = useRef([]);
    const visitedRef = useRef(new Set());
    const stepCountRef = useRef(0);

    // Directions: up, right, down, left
    const directions = [
        [-1, 0], [0, 1], [1, 0], [0, -1]
    ];
    const directionNames = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

    const isValid = (row, col, visited) => {
        return (
            row >= 0 &&
            row < maze.length &&
            col >= 0 &&
            col < maze[0].length &&
            maze[row][col] !== 1 &&
            !visited.has(`${row},${col}`)
        );
    };

    const findStartAndEnd = () => {
        let start = null, end = null;
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === 2) start = { row: i, col: j };
                if (maze[i][j] === 3) end = { row: i, col: j };
            }
        }
        return { start, end };
    };

    const solveStepByStep = async () => {
        const { start, end } = findStartAndEnd();
        if (!start || !end) {
            setMessage('❌ Start or end point not found!');
            return;
        }

        setIsSearching(true);
        setMessage('🔍 Starting backtracking search...');
        pathRef.current = [start];
        visitedRef.current = new Set([`${start.row},${start.col}`]);
        stepCountRef.current = 0;

        const result = await backtrackWithVisualization(start.row, start.col, end);

        if (result) {
            setPathFound(true);
            setMessage('🎉 Path found successfully!');
        } else {
            setMessage('❌ No path exists to the destination');
        }
        setIsSearching(false);
    };

    const backtrackWithVisualization = async (row, col, end) => {
        // Update visualization
        await new Promise(resolve => setTimeout(resolve, 800));

        stepCountRef.current++;
        setStepCount(stepCountRef.current);
        setCurrentPos({ row, col });
        setPath([...pathRef.current]);
        setVisited(new Set(visitedRef.current));

        // Check if we reached the end
        if (row === end.row && col === end.col) {
            setMessage(`✅ Destination reached in ${stepCountRef.current} steps!`);
            return true;
        }

        setMessage(`🔍 Step ${stepCountRef.current}: Exploring position (${row}, ${col})`);

        // Try all four directions
        for (let i = 0; i < directions.length; i++) {
            const [dr, dc] = directions[i];
            const newRow = row + dr;
            const newCol = col + dc;

            if (isValid(newRow, newCol, visitedRef.current)) {
                // Mark as visited and add to path
                visitedRef.current.add(`${newRow},${newCol}`);
                pathRef.current.push({ row: newRow, col: newCol });

                setMessage(`➡️ Trying direction ${directionNames[i]} to (${newRow}, ${newCol})`);

                // Recursive call
                if (await backtrackWithVisualization(newRow, newCol, end)) {
                    return true;
                }

                // Backtrack: remove from path and visited
                pathRef.current.pop();
                visitedRef.current.delete(`${newRow},${newCol}`);

                await new Promise(resolve => setTimeout(resolve, 600));
                setMessage(`⬅️ Backtracking from (${newRow}, ${newCol})`);
                setPath([...pathRef.current]);
                setVisited(new Set(visitedRef.current));
            }
        }

        return false;
    };

    const resetMaze = () => {
        setMaze(initialMaze);
        setPath([]);
        setVisited(new Set());
        setCurrentPos({ row: 0, col: 0 });
        setIsSearching(false);
        setPathFound(false);
        setMessage('Click "Start Search" to begin pathfinding');
        setStepCount(0);
        pathRef.current = [];
        visitedRef.current = new Set();
        stepCountRef.current = 0;
    };

    const getCellStyle = (row, col) => {
        const cellKey = `${row},${col}`;
        const isInPath = path.some(p => p.row === row && p.col === col);
        const isVisitedCell = visited.has(cellKey);
        const isCurrent = currentPos.row === row && currentPos.col === col;

        if (maze[row][col] === 1) {
            return 'bg-gray-800 text-white'; // Wall
        } else if (maze[row][col] === 2) {
            return 'bg-green-500 text-white font-bold'; // Start
        } else if (maze[row][col] === 3) {
            return 'bg-red-500 text-white font-bold'; // End
        } else if (isCurrent && isSearching) {
            return 'bg-yellow-400 text-black font-bold animate-pulse'; // Current position
        } else if (isInPath && pathFound) {
            return 'bg-blue-400 text-white font-semibold'; // Final path
        } else if (isInPath) {
            return 'bg-blue-300 text-black'; // Current path being explored
        } else if (isVisitedCell) {
            return 'bg-orange-200 text-black'; // Visited but not in current path
        } else {
            return 'bg-white border-gray-300'; // Open path
        }
    };

    const getCellContent = (row, col) => {
        if (maze[row][col] === 1) return '🧱';
        if (maze[row][col] === 2) return 'S';
        if (maze[row][col] === 3) return 'E';
        if (currentPos.row === row && currentPos.col === col && isSearching) return '🔍';
        return '';
    };

    return (
        <div className="py-4 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Backtracking Algorithm - Maze Pathfinding</h2>

            {/* Algorithm Info */}
            <div className="mb-4 p-4 layout-default-bg text-white rounded-lg">
                <h3 className="font-semibold mb-2">How it works:</h3>
                <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Start at the starting point (S) and mark it as visited</li>
                    <li>Try moving in each direction (up, right, down, left)</li>
                    <li>If a direction leads to a valid unvisited cell, explore it recursively</li>
                    <li>If we reach the end (E), return success</li>
                    <li>If a path doesn't work, backtrack and try another direction</li>
                    <li>Continue until destination is found or all paths are exhausted</li>
                </ul>
            </div>

            {/* Status */}
            <div className="mb-4 p-3 layout-default-bg text-white rounded">
                <p className="font-medium">{message}</p>
                <p className="text-sm text-gray-600">Steps taken: {stepCount}</p>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold">S</div>
                    <span>Start</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold">E</div>
                    <span>End</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">🧱</div>
                    <span>Wall</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">🔍</div>
                    <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-300 rounded"></div>
                    <span>Current Path</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-200 rounded"></div>
                    <span>Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-400 rounded"></div>
                    <span>Final Path</span>
                </div>
            </div>

            {/* Maze Grid */}
            <div className="mb-4">
                <div className="inline-block border-2 border-gray-400">
                    {maze.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`
                                        w-12 h-12 border border-gray-300 
                                        flex items-center justify-center
                                        font-medium text-sm
                                        ${getCellStyle(rowIndex, colIndex)}
                                    `}
                                >
                                    {getCellContent(rowIndex, colIndex)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:bg-gray-400"
                    onClick={solveStepByStep}
                    disabled={isSearching || pathFound}
                >
                    {isSearching ? 'Searching...' : 'Start Search'}
                </button>
                <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    onClick={resetMaze}
                >
                    Reset
                </button>
            </div>

            {/* Path Information */}
            {path.length > 0 && (
                <div className="mt-4 p-3 layout-default-bg text-white rounded">
                    <h4 className="font-semibold mb-2">Current Path:</h4>
                    <div className="text-sm">
                        {path.map((pos, index) => (
                            <span key={index}>
                                ({pos.row}, {pos.col})
                                {index < path.length - 1 ? ' → ' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BacktrackingVisualizer;
