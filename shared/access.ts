export function canConfirmAdult(isAdult: boolean, acceptsPrivacy: boolean) {
  return isAdult && acceptsPrivacy;
}

export function canEnterMemberArea(isAuthenticated: boolean, adultConfirmed: boolean) {
  return isAuthenticated && adultConfirmed;
}
