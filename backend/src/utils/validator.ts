/**
 * Validate email according to RFC 2822 standard.
 * Returns true if email matches the requirements.
 * @param email Email to validate.
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/**
 * Password must have at least 8 characters and include at least: 1 upper case character, 1 lower case character, one number, one special character.
 * Returns true if password matches the requirements.
 * @param password Password to validate.
 */
export function validatePassword(password) {
    const re = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
    return re.test(password);
}