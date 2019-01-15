import { prisma } from "../prisma";
import { badEmailMessage, emailExistsErrorMessage } from "./errorMessages";
import { BadData } from "../errorTypes";

/**
 * Validate email according to RFC 2822 standard.
 * Returns true if email matches the requirements.
 * @param email Email to validate.
 */
export function validateEmailFormat(email) {
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

/**
 * Returns true if password matches the requirements.
 * @param password Password to validate.
 */
export function validatePassword(password) {
  const re = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
  return re.test(password);
}

export async function validateEmail(email) {
  if (!validateEmailFormat(email))
    throw new BadData({
      data: {
        additional_info: badEmailMessage,
      }
    });

  const emailExists = await prisma.query.user({ where: { email: email.toLowerCase() } });
  if (emailExists)
    throw new BadData({
      data: {
        additional_info: emailExistsErrorMessage,
      }
    });
}