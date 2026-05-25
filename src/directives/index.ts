import type { App } from 'vue'
import { setupEnhanceCodeDirective } from "./enhanceCode"

export function setupGlobDirectives(app: App) {
    setupEnhanceCodeDirective(app)
}