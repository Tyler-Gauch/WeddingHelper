export function guestFullName(model) {
    return [capitalize(model.firstName), capitalize(model.lastName), model.suffix].filter(f => f).join(" ");
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}