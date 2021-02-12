/**
 * AuroraLauncher LauncherServer - Server for AuroraLauncher
 * Copyright (C) 2020 - 2021 AuroraTeam

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as fs from "fs"

import { LogHelper } from "./helpers/LogHelper"
import { StorageHelper } from "./helpers/StorageHelper"

export class ConfigManager {
    private config: MCLConfig

    constructor() {
        if (fs.existsSync(StorageHelper.configFile)) {
            LogHelper.info("Загрузка конфигурации")
            this.load()
        } else {
            LogHelper.info("Конфигурация не найдена! Создана конфигурация по умолчанию")
            this.config = this.getDefaults()
            this.save()
        }
    }

    getProperty(property: string, raw = false): any {
        const path = property.split(".")
        let prop: any = this.config
        path.forEach((el) => {
            prop = prop[el]
            if (prop === undefined) {
                if (!raw) LogHelper.fatal('Свойство "%s" не найдено!', property)
                return prop
            }
        })
        return prop
    }

    getDefaults(): MCLConfig {
        const config = MCLConfig.getDefaults()
        return config
    }

    load(): void {
        const config = fs.readFileSync(StorageHelper.configFile)
        try {
            this.config = JSON.parse(config.toString())
        } catch (e) {
            if (e instanceof SyntaxError) {
                LogHelper.error(e)
                LogHelper.fatal("Синтаксис Json нарушен! Попробуйте исправить или удалить config.json")
            }
        }
    }

    save(): void {
        fs.writeFileSync(StorageHelper.configFile, JSON.stringify(this.config, null, 4))
    }
}

export class MCLConfig {
    concurrency: number

    static getDefaults(): MCLConfig {
        const defaults = new MCLConfig()
        defaults.concurrency = 32
        return defaults
    }
}
