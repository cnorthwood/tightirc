type IRCLine = {
    tags: ?Array<{key: string, value: string }>,
    prefix: ?string,
    command: string,
    params: string[],
};

function parseIrc(line: string): IRCLine {
    const parts = line.split(' ');
    return {
        tags: null,
        prefix: null,
        command: parts[0],
        params: parts.slice(1),
    };
}

export default parseIrc;
