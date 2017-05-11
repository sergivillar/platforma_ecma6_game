const SCALE = 20;

function createElement (type, className) {
    let element = document.createElement(type);
    if (className) element.className = className;
    return element
}

function DOMDisplay (parent, level) {
    this.wrap = parent.appendChild(createElement('div', 'game'));
    this.level = level;

    this.drawBackground = function () {
        let table = createElement('table', 'background');
        table.style.width = this.level.width * SCALE + 'px';

        this.level.grid.forEach(row => {
            let rowElement = createElement('tr');
            rowElement.style.height = SCALE + 'px';
            table.appendChild(rowElement);
            row.forEach(type => rowElement.appendChild(createElement('td', type)));
        })  

        return table;
    }

    this.wrap.appendChild(this.drawBackground());
}