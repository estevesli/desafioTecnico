export default login;
async function login(page,email, password){
    await page.locator('input[data-test="username"]').fill(email);
    await page.locator('input[data-test="password"]').fill(password);
    await page.locator('input[data-test="login-button"]').click();

}
async function checkoutInformation(page, firstName, lastName, postalCode){
    await page.locator('input[data-test="firstName"]').fill(firstName);
    await page.locator('input[data-test="lastName"]').fill(lastName);
    await page.locator('input[data-test="postalCode"]').fill(postalCode);
    await page.locator('input[data-test="continue"]').click();
}