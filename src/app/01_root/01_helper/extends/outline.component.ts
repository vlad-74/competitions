import { HostBinding } from '@angular/core';
import { environment } from '@environments/environment';
/**
 * КЛАСС ДЛЯ НАСЛЕДОВАНИЯ КОМПОНЕНТАМИ
 *
 * при наследовании получают outline для элемента компонента
 */

export abstract class OutlineComponent {
    /**
     * классы / компоненты которым не нужна outline
     */
    private isNotOutline = [''];

    protected constructor(
        public px = 0,
    ) {}
    @HostBinding('style.outline') public color: string = this.getColor();

    /**
     * Отображаем outline, если находимся в режиме разработки и есть this.px
     */
    public getColor() {
        if (!environment.production && this.px && !this.getIsNotOutline()) {
            return this.color = this.px + 'px solid ' + hhh.dom.colorGeneration();
        }

        return null;
    }

    /**
     * Проверяем есть ли наименование класса / компонента в isNotOutline
     */
    private getIsNotOutline() {
        if (this.isNotOutline.includes(this.constructor.name)) {
            return true;
        }

        return false;
    }
}
