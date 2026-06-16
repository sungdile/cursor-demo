import { isValidEmail } from './validator.js';

export { isValidEmail };

/**
 * 사용자 배열에서 email 필드를 추출한다.
 * @param {Array<{ email: string }>} users - 사용자 목록
 * @returns {string[]} 추출된 이메일 목록
 */
export function extractEmails(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users.map((user) => user.email);
}

/**
 * 유효한 이메일만 필터링한다.
 * @param {Array<{ email: string }>} users - 사용자 목록
 * @returns {string[]} 유효한 이메일 목록
 */
export function getValidEmails(users) {
    return extractEmails(users).filter(isValidEmail);
}

/**
 * 유효한 이메일 중 중복을 제거한다.
 * @param {Array<{ email: string }>} users - 사용자 목록
 * @returns {string[]} 중복 제거된 유효 이메일 목록
 */
export function uniqueValidEmails(users) {
    return [...new Set(getValidEmails(users))];
}

/**
 * 이메일 문자열을 정규화한다. 앞뒤 공백을 제거하고 도메인 부분을 소문자로 변환한다.
 * @param {string} email - 정규화할 이메일
 * @returns {string|null} 정규화된 이메일. 문자열이 아니면 null
 */
export function normalizeEmail(email) {
    if (typeof email !== 'string') return null;

    const trimmed = email.trim();
    const atIndex = trimmed.lastIndexOf('@');
    if (atIndex <= 0) return trimmed;

    const local = trimmed.slice(0, atIndex);
    const domain = trimmed.slice(atIndex + 1).toLowerCase();
    return `${local}@${domain}`;
}
