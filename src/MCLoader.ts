/**
 * MC Loader - Assets/clients loader for Minecraft
 * Copyright (C) 2021 Andrew Molchanov (https://github.com/jocat)

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

require("source-map-support").install()

const version = require("../package").version

import * as colors from "colors/safe"
import { CommandsManager } from "./commands/CommandsManager"

export class MCLoader {
    private _CommandsManager: CommandsManager

    constructor() {
        console.log(
            colors.bold(
                colors.cyan("MCLoader ") +
                    "v" +
                    colors.yellow(version) +
                    colors.green("\nCopyright (C) 2021 ") +
                    colors.blue("AuroraTeam (https://github.com/AuroraTeam)") +
                    colors.green(
                        "\nThis program comes with ABSOLUTELY NO WARRANTY; for details type `license w'." +
                            "\nThis is free software, and you are welcome to redistribute it under certain conditions; type `license c' for details."
                    )
            )
        )

        this._CommandsManager = new CommandsManager()
    }

    get CommandsManager(): CommandsManager {
        return this._CommandsManager
    }
}

export const App = new MCLoader()