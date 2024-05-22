import { string } from 'joi';
import { IProperties } from 'models/properties.model';

type versionProps = {
    V1: 'v1';
    V2: 'v2';
};

export const pathBuilder = (path: string, version: keyof versionProps) => {
    return '/api/' + version + path;
};

export function findNullKey(obj: {
    [key: string]: any;
}): { key: string; value: null | '' } | false {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Check for null/empty values in the current key-value pair
            if (obj[key] === null || obj[key] === '') {
                return { key, value: obj[key] }; // Found at top level
            }

            // If value is an object, recursively call findNullKey on it (optional)
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const nestedResult = findNullKey(obj[key]); // Recursive call
                if (nestedResult) {
                    return {
                        key: `${key}.${nestedResult.key}`,
                        value: nestedResult.value,
                    }; // Combine key paths
                }
            }
        }
    }
    return false;
}
