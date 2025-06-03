export default login;
async function login(page,email, password){
    await page.locator('input[data-test="username"]').fill(email);
    await page.locator('input[data-test="password"]').fill(password);
    await page.locator('input[data-test="login-button"]').click();

}
async function addToCart(page){
    await page.locator('[data-test="add-to-cart"]').click();
}
