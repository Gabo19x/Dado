# Dado - Plan de Expansión Multi-tipo

## Objetivo
Extender la app de dados de mesa de solo d6 a soporte completo de:
**d2, d4, d6, d8, d12, d20**

---

## Decisiones de diseño

| Aspecto | Decisión |
|---|---|
| **Selector de dado** | Botones individuales por tipo |
| **Forma visual** | d2=moneda 2D, d4=tetraedro, d6=cubo 3D, d8=octaedro, d12/d20=poliedros 3D simplificados |
| **Resultado numérico** | Sí, mostrar tras animación |
| **Tirar todos** | Botón dedicado |
| **Suma total** | Visible en pantalla |
| **Límite** | 6 dados totales |
| **Eliminación** | Último agregado (LIFO) |
| **Colores** | Por tipo de dado |
| **Responsive** | Desktop, tablet, móvil |
| **Rendimiento móvil** | d12 y d20 usan poliedros 3D simplificados |

---

## Mapa de rutas

```
C:\Users\Janus\Desktop\Repositorios\Dado\
├── index.html          # Modificar: nuevos botones, área suma, contenedores
├── app.js              # Reescribir completamente
├── PLAN.md             # Este archivo
├── css/
│   ├── style.scss      # Modificar: estilos de todos los poliedros
│   ├── style.css       # Regenerar
│   ├── globales.scss   # Modificar: layout responsive, botones, contenedores
│   ├── globales.css    # Regenerar
│   └── *.map           # Regenerar
```

---

## Fase 1 — Refactorización de app.js

### Arquitectura

```javascript
const DICE_TYPES = {
    d2:  { faces: 2,  color: '#...', label: 'd2',  render: renderD2 },
    d4:  { faces: 4,  color: '#...', label: 'd4',  render: renderD4 },
    d6:  { faces: 6,  color: '#...', label: 'd6',  render: renderD6 },
    d8:  { faces: 8,  color: '#...', label: 'd8',  render: renderD8 },
    d12: { faces: 12, color: '#...', label: 'd12', render: renderD12 },
    d20: { faces: 20, color: '#...', label: 'd20', render: renderD20 },
};
```

### Estados
- `dice[]`: Array de objetos dado activos `{ type, element, result, color }`
- `MAX_DICE = 6`
- `sumTotal`: número, se recalcula tras cada tirada

### Funciones principales
- `createDie(type)`: Crea DOM + animación de entrada
- `removeDie()`: Elimina el último del array y DOM
- `rollDie(index)`: Anima y devuelve resultado
- `rollAll()`: Llama rollDie para cada dado
- `updateSum()`: Recorre dados y suma resultados
- `updateUI()`: Habilita/deshabilita botones según límite

---

## Fase 2 — Formas poliédricas

### d2 — Moneda 2D
- No usa 3D transforms
- Círculo con dos estados visuales (cara/cruz)
- Al tirar: animación de giro 2D (flip)
- Muestra "CARA" o "CRUZ" (o 1/2)

### d4 — Tetraedro
- 4 caras triangulares
- CSS: `clip-path: polygon()` para triángulos
- Rotaciones: ejes a 120°
- 3 caras convergentes + base
- Resultados: 1-4

### d6 — Cubo (existente)
- Migrar al nuevo sistema manteniendo CSS actual
- 6 caras cuadradas, rotaciones cada 90°
- Resultados: 1-6

### d8 — Octaedro
- 8 caras triangulares
- 2 pirámides unidas por la base
- Rotaciones a 60° y 120°
- `clip-path: polygon()` para triángulos
- Resultados: 1-8

### d12 — Poliedro simplificado
- No usar dodecaedro real (12 pentágonos)
- Alternativa: prisma hexagonal o trapezoedro simplificado
- Que se vea tridimensional con muchas caras
- Resultados: 1-12

### d20 — Poliedro simplificado
- No usar icosaedro real (20 triángulos)
- Alternativa: dodecaedro (12 pentágonos) o icosaedro truncado simplificado
- Otra opción: esfera con caras planas distribuidas
- Resultados: 1-20

---

## Fase 3 — Lógica de tirada

### Algoritmo
1. Generar aleatorio: `Math.floor(Math.random() * faces) + 1`
2. Mapear resultado a rotación 3D que muestre la cara correcta
3. Aplicar `transform` con transición CSS de 2s
4. Al finalizar `transitionend`: mostrar resultado en overlay/badge
5. Actualizar suma total

### Rotaciones por tipo
- **d2**: flip CSS keyframe
- **d4**: mapa de 4 rotaciones → cara frontal
- **d6**: 24 rotaciones (4 por eje × 3 ejes) → cara correcta
- **d8**: 8 rotaciones → cara frontal
- **d12/d20**: rotación aleatoria + resultado numérico independiente (la cara visible puede no coincidir exactamente)

### Mostrar resultado
- Cada dado muestra su resultado en badge superpuesto tras la animación
- Badge desaparece al iniciar nueva tirada

---

## Fase 4 — UI

### Botones (zona superior)
```
[+d2] [+d4] [+d6] [+d8] [+d12] [+d20] | [🎲 Tirar todos] | [❌]
```
- Desktop: 1 fila compacta
- Tablet: 2 filas (6 tipos + acciones)
- Móvil: 2 filas de tipos + 1 fila de acciones

### Área de dados
- CSS Grid responsivo
- Desktop: 3 columnas, dados 180px
- Tablet: 2 columnas, dados 140px
- Móvil: 2 columnas, dados 100px (mín. 80px)

### Suma total
- Badge, se actualiza tras cada tirada
- "Total: 24"

### Colores por tipo
- d2: Gris plata
- d4: Rojo
- d6: Azul
- d8: Verde
- d12: Púrpura
- d20: Naranja

### Breakpoints
- Móvil: < 600px
- Tablet: 600–1024px
- Desktop: > 1024px

---

## Fase 5 — Consideraciones técnicas

### Rendimiento
- `will-change: transform` solo durante animaciones
- Evitar `clip-path` complejo en d12/d20
- `transform: translateZ(0)` para aceleración GPU
- Límite de 6 dados evita degradación

### Eventos
- Todos `click` (compatible touch)
- `transitionend` para detectar fin de animación
- Botones deshabilitados durante animación global

### Accesibilidad (opcional, fase futura)
- `aria-label` en botones
- `role="button"` y `tabindex`
- Estados `disabled`

---

## Orden de implementación

1. Refactor app.js (arquitectura de tipos)
2. Migrar d6 existente al nuevo sistema
3. Implementar d4 (tetraedro)
4. Implementar d2 (moneda 2D)
5. Implementar d8 (octaedro)
6. Implementar d12 simplificado
7. Implementar d20 simplificado
8. UI: botones por tipo, tirar todos, suma total
9. Responsive design
10. Pruebas y pulido
