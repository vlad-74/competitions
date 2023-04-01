import { ISnapshot } from '@interfaces/snapshot.interface';
import { OutlineComponent } from '@helper/extends/outline.component';
import { environment } from '@environments/environment';
import { ILogParam, IOutlineParam } from '@interfaces/helper.interface';

/**
 * КЛАСС ДЛЯ НАСЛЕДОВАНИЯ КОМПОНЕНТАМИ ЛОГИРОВАНИЯ
 */
export abstract class LogComponent extends OutlineComponent {
    // если ГЛОБАЛЬНО нужно логирование
    private isGlobalLog = true; // false - если нужно отменить
    // классы / компоненты которых не нужно логировать
    private isNotLog = [''];

    protected constructor(
        public logParam: ILogParam,
        public outlineParam: IOutlineParam,
    ) { super( outlineParam ); }

    /**
     * Логируем,
     * если находимся в режиме разработки,
     * есть this.isGlobalLog с this.logParam.type
     * и наименование класса/компонента нет в isNotLog
     */
    public log(...args) {
        if (!environment.production && this.isGlobalLog && this.logParam.isGlobalLog && this.logParam.type && !this.getIsNotLog()) {
            const result = [this.constructor.name];

            // при this.logType === 'default' в ...args первым аргументом передавать appSnapshot приложения
            if (this.logParam.type === 'default' && args.length === 1) {
                const snapshot: ISnapshot = hhh.object.objectCopy(args[0]);

                if (snapshot.appHistory) {
                    const index = snapshot.appHistory.length - 1;
                    const arrCurrentRoute = snapshot.appHistory[index].split('/');
                    const i = arrCurrentRoute.length - 1;
                    const page = arrCurrentRoute[i];

                    result.push(page);
                }
                result.push(
                    snapshot.itemChange,
                    hhh.object.objectCopy(args[0]),
                );
            }
            // hhh.common.log(result);
            hhh.common.setTypelog(result, 11, '=');
        }
    }

    /**
     * Проверяем есть ли наименование класса / компонента в isNotLog
     */
    private getIsNotLog() {
        if (this.isNotLog.includes(this.constructor.name)) {
            return true;
        }

        return false;
    }
}