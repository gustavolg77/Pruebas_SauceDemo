# Auditoria SauceDemo

Proyecto academico de auditoria funcional mediante pruebas de caja negra automatizadas sobre [SauceDemo](https://www.saucedemo.com/).

## Objetivo

Validar el comportamiento observable de una aplicacion de comercio electronico usando Playwright Test y TypeScript, sin acceder al codigo fuente ni a servicios internos del sitio.

## Tecnologias

- Playwright Test
- TypeScript
- Node.js
- npm

## Estructura

```text
pages/       Page Objects reutilizables
utils/       Datos de prueba centralizados
tests/login/ Casos de inicio de sesion
tests/products/ Casos de productos y ordenamiento
tests/cart/  Casos del carrito
tests/checkout/ Casos de checkout y compra
tests/navigation/ Casos de navegacion y logout
tests/e2e/   Flujos end to end
```

## Instalacion

```powershell
npm install
npx playwright install chromium
```

## Ejecucion

Ejecutar todos los tests:

```powershell
npm test
```

Ejecutar la suite E2E:

```powershell
npm run test:e2e
```

Ejecutar con navegador visible:

```powershell
npm run test:headed
```

Ejecutar un archivo especifico:

```powershell
npx playwright test tests/login/login.spec.ts
```

Abrir el reporte HTML:

```powershell
npm run report
```

## Casos automatizados

- TC-SD-001: inicio de sesion valido.
- TC-SD-002: usuario bloqueado.
- TC-SD-003: agregar producto al carrito.
- TC-SD-004: eliminar producto del carrito.
- TC-SD-005: validacion de campos obligatorios.
- TC-SD-006: ordenar por precio ascendente.
- TC-SD-007: ordenar por precio descendente.
- TC-SD-008: detalle de producto.
- TC-SD-009: navegacion entre producto, carrito e inventario.
- TC-SD-010: varios productos en el carrito.
- TC-SD-011: compra con informacion valida.
- TC-SD-012: cierre de sesion.

## Flujos E2E

- E2E-01: flujo completo de compra desde el login hasta la confirmacion.
- E2E-02: gestion de varios productos y ordenamiento del inventario.

## Evidencias

En caso de fallo, Playwright conserva screenshot, video y trace segun la configuracion del proyecto. El reporte HTML se genera en `playwright-report/`.
