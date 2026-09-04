const { test, expect } = require('@playwright/test');
const allure = require('allure-js-commons');

// Mesmo app de exemplo usado nos testes do Cypress (cypress/e2e/1-getting-started/todo.cy.js),
// aqui reescrito em Playwright para rodar lado a lado.

test.describe('example to-do app', () => {
  test.beforeEach(async ({ page }) => {
    // allure-playwright já rotula "framework: playwright" automaticamente em cada resultado.
    await allure.epic('To-Do App');
    await page.goto('/todo');
  });

  test('displays two todo items by default', async ({ page }) => {
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems.first()).toHaveText('Pay electric bill');
    await expect(todoItems.last()).toHaveText('Walk the dog');
  });

  test('can add new todo items', async ({ page }) => {
    const newItem = 'Feed the cat';

    await page.locator('[data-test=new-todo]').fill(newItem);
    await page.locator('[data-test=new-todo]').press('Enter');

    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);
    await expect(todoItems.last()).toHaveText(newItem);
  });

  test('can check off an item as completed', async ({ page }) => {
    const firstItem = page.locator('.todo-list li').first();
    await firstItem.locator('input[type=checkbox]').check();
    await expect(firstItem).toHaveClass(/completed/);
  });
});
