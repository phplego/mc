import configparser
import json
import sys

from enum import StrEnum, verify, UNIQUE
from pathlib import Path

if len(sys.argv) < 2:
    print(f"usage: {sys.argv[0]} <skins-directory>")
    exit(1)


@verify(UNIQUE)
class Colors(StrEnum):
    B4 = "[std] 16 Colors"
    B8 = "[std] 256 Colors"
    B24 = "[std] True Color"


result = {Colors.B24: [], Colors.B8: [], Colors.B4: []}

for skin_path in Path(sys.argv[1]).glob("*.ini"):
    print(f"Parsing {skin_path}...")

    config = configparser.ConfigParser()
    config.read(skin_path)

    if config.getboolean("skin", "truecolors", fallback=False):
        result[Colors.B24].append(skin_path.name)
    elif config.getboolean("skin", "256colors", fallback=False):
        result[Colors.B8].append(skin_path.name)
    else:
        result[Colors.B4].append(skin_path.name)

Path("skins.json").write_text(json.dumps(result, indent=2))
