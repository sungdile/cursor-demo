import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    isValidEmail,
    extractEmails,
    getValidEmails,
    uniqueValidEmails,
    normalizeEmail,
} from './email.js';

describe('isValidEmail', () => {
    it('returns true for valid emails', () => {
        assert.equal(isValidEmail('john@example.com'), true);
        assert.equal(isValidEmail('alice@example.com'), true);
        assert.equal(isValidEmail('user+tag@example.com'), true);
        assert.equal(isValidEmail('a@b.co'), true);
        assert.equal(isValidEmail('user@[192.168.0.1]'), true);
    });

    it('returns false for invalid emails', () => {
        assert.equal(isValidEmail('not-an-email'), false);
        assert.equal(isValidEmail('invalid-email'), false);
        assert.equal(isValidEmail('missing@domain'), false);
        assert.equal(isValidEmail(''), false);
        assert.equal(isValidEmail(null), false);
        assert.equal(isValidEmail(123), false);
    });

    it('enforces RFC 3696 length limits', () => {
        assert.equal(isValidEmail('a'.repeat(64) + '@example.com'), true);
        assert.equal(isValidEmail('a'.repeat(65) + '@example.com'), false);
        assert.equal(isValidEmail('a'.repeat(243) + '@example.com'), false);
    });

    it('rejects invalid IP literal octets (emailregex.com bug fix)', () => {
        assert.equal(isValidEmail('user@[192.168.0.256]'), false);
        assert.equal(isValidEmail('user@[192.168.00.1]'), false);
    });
});

describe('extractEmails', () => {
    it('extracts emails from valid members', () => {
        const members = [
            { name: 'John', email: 'john@example.com' },
            { name: 'Jane', email: 'jane@example.com' },
        ];
        assert.deepEqual(extractEmails(members), ['john@example.com', 'jane@example.com']);
    });

    it('extracts emails including invalid ones', () => {
        const members = [{ name: 'Bad', email: 'invalid' }];
        assert.deepEqual(extractEmails(members), ['invalid']);
    });

    it('returns an empty array for non-array input', () => {
        assert.deepEqual(extractEmails(null), []);
    });
});

describe('getValidEmails', () => {
    it('returns only valid emails', () => {
        const members = [
            { name: 'John', email: 'john@example.com' },
            { name: 'Bad', email: 'invalid' },
            { name: 'Jane', email: 'jane@example.com' },
        ];
        assert.deepEqual(getValidEmails(members), ['john@example.com', 'jane@example.com']);
    });

    it('returns an empty array for non-array input', () => {
        assert.deepEqual(getValidEmails(undefined), []);
    });
});

describe('uniqueValidEmails', () => {
    it('returns unique valid emails only', () => {
        const members = [
            { name: 'John', email: 'john@example.com' },
            { name: 'John2', email: 'john@example.com' },
            { name: 'Bad', email: 'invalid' },
            { name: 'Jane', email: 'jane@example.com' },
        ];
        assert.deepEqual(uniqueValidEmails(members), ['john@example.com', 'jane@example.com']);
    });
});

describe('normalizeEmail', () => {
    it('trims whitespace and lowercases the domain', () => {
        assert.equal(normalizeEmail('  John@Example.COM  '), 'John@example.com');
        assert.equal(normalizeEmail('user@MAIL.ORG'), 'user@mail.org');
    });

    it('returns null for non-string input', () => {
        assert.equal(normalizeEmail(null), null);
        assert.equal(normalizeEmail(undefined), null);
    });

    it('returns trimmed string when @ is missing', () => {
        assert.equal(normalizeEmail('  invalid  '), 'invalid');
    });
});
