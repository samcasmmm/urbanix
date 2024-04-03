type versionProps = {
    V1: 'v1';
    V2: 'v2';
};

export const pathBuilder = (path: string, version: keyof versionProps) => {
    return '/api/' + version + path;
};
