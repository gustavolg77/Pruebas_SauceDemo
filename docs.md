Quiero que trabajes como un QA Automation Engineer senior especializado en pruebas de caja negra, Playwright, TypeScript y automatización E2E.

Estoy desarrollando un proyecto académico de AUDITORÍA DE SISTEMAS cuyo objetivo es auditar funcionalmente el sitio público SauceDemo:

https://www.saucedemo.com/

IMPORTANTE:
- No tenemos acceso al código fuente de SauceDemo.
- El enfoque es BLACK BOX TESTING.
- La automatización debe realizarse exclusivamente desde el comportamiento observable de la aplicación.
- El framework principal será Playwright Test.
- El lenguaje será TypeScript.
- El entorno de trabajo es VS Code/terminal.
- Queremos un proyecto profesional, mantenible y preparado para demostrarlo en una materia universitaria.
- No quiero una solución improvisada ni scripts aislados sin estructura.
- Primero debes inspeccionar el entorno y el proyecto actual antes de modificar archivos.
- Debes ejecutar las pruebas después de implementarlas y corregir los errores encontrados.

==================================================
1. OBJETIVO GENERAL DEL PROYECTO
==================================================

Automatizar una selección de casos de prueba funcionales de SauceDemo y posteriormente construir 2 pruebas End-to-End (E2E) que integren varias funcionalidades.

El proyecto debe permitir:

1. Ejecutar casos de prueba individualmente.
2. Ejecutar todos los casos.
3. Ejecutar únicamente los E2E.
4. Generar reportes de ejecución.
5. Obtener evidencias cuando corresponda.
6. Mantener los tests organizados.
7. Reutilizar funcionalidades comunes.
8. Facilitar la trazabilidad entre TC y E2E.
9. Evitar duplicación innecesaria de código.
10. Ser adecuado para una auditoría de caja negra.

==================================================
2. TECNOLOGÍAS
==================================================

Utilizar:

- Playwright Test
- TypeScript
- Node.js
- VS Code
- npm

Preferir buenas prácticas actuales de Playwright.

No introducir frameworks adicionales innecesarios.

No utilizar Selenium.

No utilizar Cypress.

No utilizar Puppeteer.

No utilizar acceso directo al backend de SauceDemo.

No inspeccionar ni depender del código fuente interno de SauceDemo.

La automatización debe comportarse como un usuario externo utilizando la interfaz web.

==================================================
3. PRIMERA FASE: INSPECCIÓN DEL ENTORNO
==================================================

Antes de modificar cualquier archivo:

1. Comprueba la estructura actual del proyecto.
2. Comprueba si package.json existe.
3. Comprueba si Playwright ya está instalado.
4. Comprueba la versión de Node.js.
5. Comprueba la versión de npm.
6. Comprueba si TypeScript está configurado.
7. Comprueba si playwright.config.ts existe.
8. Comprueba si existe una carpeta tests.
9. Comprueba si existen tests previos.
10. Comprueba si existen configuraciones que deban conservarse.

No borres archivos existentes sin necesidad.

Si el proyecto está vacío, inicialízalo correctamente con Playwright + TypeScript.

Si Playwright ya está configurado, reutiliza la configuración existente en lugar de crear otra innecesariamente.

==================================================
4. SITIO BAJO PRUEBA
==================================================

URL:

https://www.saucedemo.com/

Credenciales válidas oficiales del entorno demo:

Usuario:
standard_user

Contraseña:
secret_sauce

Usuario bloqueado:

locked_out_user

Contraseña:
secret_sauce

La aplicación utiliza una interfaz de demostración de comercio electrónico.

Las funcionalidades que nos interesan incluyen:

- Inicio de sesión
- Usuarios bloqueados
- Inventario/productos
- Ordenamiento
- Detalle de productos
- Carrito
- Eliminación de productos
- Checkout
- Finalización de compra
- Logout
- Navegación

==================================================
5. CASOS DE PRUEBA DEFINIDOS
==================================================

Estos son los casos de prueba que debemos conservar como alcance funcional.

No cambies arbitrariamente los títulos ni inventes funcionalidades que no estén relacionadas.

------------------------------------------
TC-SD-001
------------------------------------------

Título:
Verificar inicio de sesión con credenciales válidas en SauceDemo

Objetivo:
Comprobar que un usuario con credenciales válidas pueda iniciar sesión y acceder al inventario.

Datos:
username = standard_user
password = secret_sauce

Resultado esperado:
El usuario accede correctamente a la página de inventario.

------------------------------------------
TC-SD-002
------------------------------------------

Título:
Verificar mensaje al iniciar sesión con un usuario bloqueado

Objetivo:
Comprobar que un usuario bloqueado no pueda acceder al inventario y que la aplicación muestre un mensaje informativo.

Datos:
username = locked_out_user
password = secret_sauce

Resultado esperado:
El acceso es rechazado y se muestra el mensaje correspondiente.

------------------------------------------
TC-SD-003
------------------------------------------

Título:
Verificar incorporación de un producto al carrito desde la lista

Objetivo:
Comprobar que un producto seleccionado desde el inventario pueda agregarse al carrito y que el contenido del carrito se actualice.

------------------------------------------
TC-SD-004
------------------------------------------

Título:
Verificar eliminación de un producto agregado al carrito

Objetivo:
Comprobar que un producto previamente agregado pueda eliminarse del carrito y que el carrito refleje el cambio.

------------------------------------------
TC-SD-005
------------------------------------------

Título:
Verificar validación de campos obligatorios durante el checkout

Objetivo:
Comprobar que el sistema solicite los datos obligatorios cuando el usuario intenta continuar el proceso de compra sin completar la información requerida.

------------------------------------------
TC-SD-006
------------------------------------------

Título:
Verificar ordenamiento de productos por precio de menor a mayor

Objetivo:
Comprobar que el selector de ordenamiento permita visualizar los productos desde el precio más bajo hasta el más alto.

------------------------------------------
TC-SD-007
------------------------------------------

Título:
Verificar ordenamiento de productos por precio de mayor a menor

Objetivo:
Comprobar que el selector de ordenamiento permita visualizar los productos desde el precio más alto hasta el más bajo.

------------------------------------------
TC-SD-008
------------------------------------------

Título:
Verificar visualización del detalle de un producto desde la lista

Objetivo:
Comprobar que al seleccionar un producto desde el inventario se muestre su página de detalle con la información correspondiente.

------------------------------------------
TC-SD-009
------------------------------------------

Título:
Verificar navegación entre productos, carrito y página principal

Objetivo:
Comprobar que el usuario pueda desplazarse entre las principales secciones relacionadas con productos y carrito sin perder el contexto de la aplicación.

------------------------------------------
TC-SD-010
------------------------------------------

Título:
Verificar actualización del contenido del carrito al agregar varios productos

Objetivo:
Comprobar que el carrito refleje correctamente varios productos agregados desde el inventario.

------------------------------------------
TC-SD-011
------------------------------------------

Título:
Verificar finalización de una compra con información válida

Objetivo:
Comprobar el flujo completo de checkout utilizando información válida hasta obtener la confirmación de compra.

------------------------------------------
TC-SD-012
------------------------------------------

Título:
Verificar cierre de sesión desde el menú de navegación

Objetivo:
Comprobar que un usuario autenticado pueda cerrar sesión y regresar a la pantalla de inicio de sesión.

==================================================
6. E2E DEFINIDOS
==================================================

Debemos implementar exactamente 2 flujos E2E principales.

==================================================
E2E-01 — FLUJO COMPLETO DE COMPRA
==================================================

Objetivo:

Representar un flujo completo de negocio desde el inicio de sesión hasta la confirmación de la compra.

Flujo:

1. Abrir SauceDemo.
2. Iniciar sesión con standard_user / secret_sauce.
3. Verificar acceso al inventario.
4. Seleccionar un producto.
5. Agregar el producto al carrito.
6. Acceder al carrito.
7. Verificar el producto.
8. Iniciar checkout.
9. Introducir información válida:
   First Name
   Last Name
   Postal Code
10. Continuar.
11. Verificar resumen de compra.
12. Finalizar la compra.
13. Verificar confirmación final.

Este E2E debe cubrir conceptualmente:

- TC-SD-001
- TC-SD-003
- TC-SD-005
- TC-SD-011

No significa que debas copiar literalmente los tests individuales.
El E2E debe representar un flujo integrado y autónomo.

==================================================
E2E-02 — GESTIÓN DEL CARRITO
==================================================

Objetivo:

Representar un flujo donde el usuario administra varios productos dentro del carrito.

Flujo:

1. Abrir SauceDemo.
2. Iniciar sesión.
3. Verificar inventario.
4. Agregar dos productos.
5. Verificar actualización del contador del carrito.
6. Abrir el carrito.
7. Verificar ambos productos.
8. Eliminar uno.
9. Verificar que solamente permanezca el producto esperado.
10. Regresar al inventario.
11. Utilizar el ordenamiento por precio.
12. Verificar el orden resultante.

Este E2E debe relacionarse conceptualmente con:

- TC-SD-003
- TC-SD-004
- TC-SD-006
- TC-SD-007
- TC-SD-010

==================================================
7. REGLAS DE AUTOMATIZACIÓN
==================================================

Prioriza locators robustos.

Preferencia:

1. getByRole()
2. getByLabel()
3. getByTestId() / data-test cuando corresponda
4. locators específicos y estables

Evita:

- selectores CSS excesivamente largos
- XPath innecesario
- selectores basados en posición
- nth() cuando exista una alternativa más estable
- esperas arbitrarias como waitForTimeout()
- depender de textos frágiles si existe un locator más estable

No uses:

await page.waitForTimeout(...)

salvo que exista una justificación técnica excepcional.

Utiliza assertions de Playwright.

Cada test debe verificar realmente el resultado esperado.

NO quiero tests que solamente hagan clics.

Por ejemplo, esto NO es suficiente:

click login
click product
click cart

Debe existir una validación después de las acciones importantes.

==================================================
8. ESTRUCTURA DEL PROYECTO
==================================================

Propón y posteriormente implementa una estructura mantenible.

Una estructura esperada podría ser:

tests/
    login/
    products/
    cart/
    checkout/
    e2e/

pages/
    LoginPage.ts
    ProductsPage.ts
    CartPage.ts
    CheckoutPage.ts

utils/
    test-data.ts

playwright.config.ts

README.md

Sin embargo, no debes crear carpetas innecesarias.

Si consideras que una estructura diferente es técnicamente mejor, explícala brevemente antes de implementarla.

Utilizar Page Object Model cuando aporte reutilización real.

No convertir cada elemento de la página en una abstracción innecesaria.

==================================================
9. DATOS DE PRUEBA
==================================================

Mantener los datos de prueba centralizados cuando sea conveniente.

Por ejemplo:

standard_user
secret_sauce
locked_out_user

Para checkout se pueden utilizar datos ficticios:

First Name:
Luis

Last Name:
QA

Postal Code:
00000

No utilizar datos personales reales.

==================================================
10. CONFIGURACIÓN DE PLAYWRIGHT
==================================================

Configurar Playwright de manera profesional.

Como mínimo:

- testDir
- baseURL
- reporter
- trace
- screenshot
- video según conveniencia
- uso razonable de retries
- configuración de navegador

Utilizar baseURL para evitar repetir:

https://www.saucedemo.com/

Por ejemplo:

page.goto('/')

en lugar de repetir constantemente la URL completa.

Inicialmente ejecutar en Chromium.

Dejar la configuración preparada para poder ampliar posteriormente a Firefox/WebKit si se decide realizar una prueba de compatibilidad.

No agregues configuración compleja que no sea necesaria.

==================================================
11. REPORTES Y EVIDENCIAS
==================================================

Necesitamos que el proyecto permita demostrar los resultados de la auditoría.

Configura un reporte HTML de Playwright.

Cuando un test falle:

- conservar trace cuando corresponda
- conservar screenshot
- conservar video si la configuración lo justifica

El objetivo es poder identificar:

- qué test falló
- dónde falló
- qué assertion falló
- evidencia del estado de la aplicación

No generar archivos innecesarios para tests exitosos si no son necesarios.

==================================================
12. NOMENCLATURA
==================================================

Mantener identificadores claros.

Ejemplos:

TC-SD-001
TC-SD-002
...
TC-SD-012

E2E-01
E2E-02

Los nombres de los tests deben permitir identificar fácilmente el TC correspondiente.

Preferir nombres claros y menores a 80 caracteres cuando sea razonable.

==================================================
13. PRINCIPIO DE CAJA NEGRA
==================================================

MUY IMPORTANTE:

No asumir cómo funciona internamente SauceDemo.

No utilizar:

- APIs privadas
- endpoints internos
- acceso a base de datos
- variables internas
- código fuente de la aplicación
- lógica interna no observable

Las verificaciones deben basarse en:

- elementos visibles
- navegación
- textos mostrados
- URLs observables
- valores visibles
- estados del carrito
- mensajes de validación
- comportamiento de botones
- comportamiento de formularios

El test debe representar lo que un usuario externo puede observar.

==================================================
14. CALIDAD DEL TEST
==================================================

Cada test debe tener:

1. Arrange
2. Act
3. Assert

Cuando corresponda.

Los tests deben ser:

- independientes
- repetibles
- deterministas
- legibles
- mantenibles

Evitar depender de que otro test se haya ejecutado antes.

Cada test debe establecer su propio estado inicial.

No depender del orden de ejecución.

==================================================
15. NO DUPLICAR LÓGICA
==================================================

Si múltiples tests necesitan:

- login
- abrir carrito
- agregar producto
- checkout

utiliza Page Objects o helpers apropiados.

Pero evita abstraer acciones simples si eso hace el código menos legible.

El objetivo es equilibrio entre reutilización y claridad.

==================================================
16. VALIDACIONES IMPORTANTES
==================================================

No basta con verificar que una página se abrió.

Por ejemplo:

Login:
- verificar URL o elemento característico del inventario.

Producto:
- verificar nombre/producto esperado.

Carrito:
- verificar producto presente o ausente.

Ordenamiento:
- obtener precios visibles y comprobar matemáticamente el orden.

Checkout:
- comprobar mensajes de validación cuando falten datos.

Compra:
- comprobar el mensaje/página de confirmación.

Logout:
- comprobar regreso a login.

==================================================
17. ORDEN DE TRABAJO
==================================================

Quiero que trabajes en este orden.

FASE 1
Inspeccionar el proyecto actual.

FASE 2
Informar brevemente:

- Node instalado
- npm instalado
- Playwright instalado o no
- estructura encontrada
- archivos relevantes

FASE 3
Configurar Playwright si es necesario.

FASE 4
Crear una prueba mínima de conexión con SauceDemo.

FASE 5
Ejecutar esa prueba.

FASE 6
Si funciona, implementar progresivamente:

TC-SD-001
TC-SD-002
TC-SD-003
TC-SD-004
TC-SD-005
TC-SD-006
TC-SD-007
TC-SD-008
TC-SD-009
TC-SD-010
TC-SD-011
TC-SD-012

FASE 7
Ejecutar los TC.

FASE 8
Corregir cualquier fallo real de automatización.

IMPORTANTE:
Si una prueba falla por un comportamiento real de SauceDemo, NO cambies el assertion simplemente para hacer que pase.

Distingue entre:

A) fallo del script
B) fallo del locator
C) problema de sincronización
D) comportamiento real de la aplicación
E) assertion incorrecta

FASE 9
Implementar:

E2E-01

FASE 10
Ejecutar E2E-01.

FASE 11
Implementar:

E2E-02

FASE 12
Ejecutar E2E-02.

FASE 13
Ejecutar toda la suite.

FASE 14
Generar y comprobar el reporte HTML.

==================================================
18. SI ENCUENTRAS PROBLEMAS
==================================================

No ocultes errores.

Si encuentras un problema:

1. Identifica la causa.
2. Explica brevemente la causa.
3. Corrige el problema si corresponde.
4. Ejecuta nuevamente.
5. Comprueba que la solución funciona.

No marques un test como passed artificialmente.

No elimines assertions para evitar fallos.

No uses sleeps para ocultar problemas de sincronización.

==================================================
19. DOCUMENTACIÓN
==================================================

Crear o actualizar README.md con:

# Auditoría SauceDemo

## Objetivo

Explicar brevemente que se realiza una auditoría funcional mediante pruebas de caja negra automatizadas.

## Tecnologías

- Playwright
- TypeScript
- Node.js

## Sitio probado

https://www.saucedemo.com/

## Estructura

Explicar brevemente las carpetas.

## Ejecución

Incluir comandos para:

Instalar dependencias:

npm install

Ejecutar todos los tests:

npx playwright test

Ejecutar tests en modo visible:

npx playwright test --headed

Ejecutar un test específico:

npx playwright test <archivo>

Abrir reporte:

npx playwright show-report

Si se utiliza UI Mode, documentar también el comando correspondiente.

## Casos automatizados

Listar:

TC-SD-001 a TC-SD-012

## E2E

Listar:

E2E-01
E2E-02

==================================================
20. CRITERIO DE ÉXITO
==================================================

El trabajo se considera correctamente implementado cuando:

- El proyecto instala correctamente.
- Playwright ejecuta correctamente.
- SauceDemo puede abrirse.
- Los locators son razonablemente estables.
- Los TC definidos están implementados.
- Los E2E definidos están implementados.
- Existen assertions significativas.
- Los tests son independientes.
- No existen esperas arbitrarias innecesarias.
- Existe reporte HTML.
- Existen evidencias para fallos.
- El proyecto tiene estructura clara.
- Existe README.
- Toda la suite puede ejecutarse mediante comandos npm/npx.
- Los resultados reales de ejecución se conservan y reportan.

==================================================
21. MUY IMPORTANTE: NO HAGAS TODO DE GOLPE
==================================================

Quiero que avances de manera controlada.

Primero inspecciona el entorno.

NO empieces creando inmediatamente los 12 TC y los 2 E2E.

Primero dime qué encontraste.

Después configura el proyecto.

Luego implementa TC-SD-001 y ejecútalo.

Una vez que TC-SD-001 funcione, continúa con el resto de forma progresiva.

En cada etapa, verifica que lo implementado realmente funciona antes de avanzar.

==================================================
22. RESULTADO FINAL ESPERADO
==================================================

Al finalizar quiero tener un repositorio de automatización profesional para la auditoría de SauceDemo basado en Playwright + TypeScript, con:

- 12 TC funcionales automatizados
- 2 E2E
- Page Objects cuando aporten valor
- datos de prueba organizados
- configuración Playwright
- assertions
- evidencias
- HTML report
- README
- trazabilidad clara TC → E2E

No quiero solamente código generado.

Quiero una implementación VERIFICADA mediante ejecución real de las pruebas.

COMIENZA AHORA POR LA FASE 1:

INSPECCIONA EL PROYECTO ACTUAL Y EL ENTORNO.

NO MODIFIQUES ARCHIVOS TODAVÍA.

DIME QUÉ ENCONTRASTE Y QUÉ PLAN VAS A SEGUIR.