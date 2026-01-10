import { LATEX_DEFAULT_TEMPLATE } from './default';
import { LATEX_SIMPLE_TEMPLATE } from './simple';

export type TemplateKey = 'default' | 'simple';

export const Templates: Record<TemplateKey, string> = {
    'default': LATEX_DEFAULT_TEMPLATE,
    'simple': LATEX_SIMPLE_TEMPLATE,
}
