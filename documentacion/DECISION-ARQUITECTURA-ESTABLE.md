# Decisión de arquitectura estable · v0.5

1. Un solo proyecto/repo, varias capas independientes.
2. Cliente vanilla HTML/CSS/JS para máxima portabilidad entre GitHub Pages, PWA, Capacitor, VS Code, Antigravity y editores Android.
3. Python es backend opcional; nunca requisito para dibujar la interfaz.
4. LiteLLM desacopla proveedores/modelos del cliente.
5. Selección de modelo por chat, no como pestaña principal.
6. Memoria dividida por capas y tarjetas.
7. Alternativas y ramas preservan versiones de conversación.
8. Arranque seguro impide que un error de importación se vea como pantalla negra sin explicación.
9. GitHub Pages es la publicación gratuita principal.
10. Mack se integra después como personaje independiente y portable.
