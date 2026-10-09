"""Run with Python 3; no third-party packages required."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.anchors = []
        self.resources = []
        self.regions = []
        self.lang = None

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == 'html':
            self.lang = attr.get('lang')
        if 'id' in attr:
            assert attr['id'] not in self.ids, f"Duplicate id: {attr['id']}"
            self.ids.add(attr['id'])
        if tag == 'a':
            href = attr.get('href', '')
            if href.startswith('#'):
                self.anchors.append(href[1:])
            if attr.get('target') == '_blank':
                assert {'noopener', 'noreferrer'} <= set(attr.get('rel', '').split()), href
        if tag in ('img', 'script'):
            self.resources.append(attr['src'])
            if tag == 'img':
                assert 'alt' in attr, 'Missing alt attribute'
        if tag == 'link' and attr.get('rel') in ('stylesheet', 'icon'):
            self.resources.append(attr['href'])
        if 'data-region' in attr:
            self.regions.append(attr['data-region'])


page = Page()
page.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
assert page.lang == 'zh-CN'
assert set(page.anchors) <= page.ids, f"Missing anchors: {set(page.anchors) - page.ids}"
assert len(page.regions) == 6 and page.regions.count('germany') == 3 and page.regions.count('america') == 3
for resource in page.resources:
    assert not urlsplit(resource).scheme, f"Unexpected external dependency: {resource}"
    path = (ROOT / resource).resolve()
    assert ROOT in path.parents and path.is_file() and path.stat().st_size > 0, resource
print(f"PASS: Chinese page, {len(page.anchors)} anchors, {len(page.resources)} local resources, 6 milestones.")
