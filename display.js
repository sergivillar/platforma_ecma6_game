const SCALE = 20;

function createElement (type, className) {
    let element = document.createElement(type);
    if (className) element.className = className;
    return element
}

function DOMDisplay (parent, level) {
    this.wrap = parent.appendChild(createElement('div', 'game'));
    this.level = level;

    this.wrap.appendChild(this.drawBackground());
    this.actorsLayer = null; 
}

DOMDisplay.prototype.drawBackground = function () {
    let table = createElement('table', 'background');
    table.style.width = this.level.width * SCALE + 'px';

    this.level.grid.forEach(row => {
        let rowElement = createElement('tr');
        rowElement.style.height = SCALE + 'px';
        table.appendChild(rowElement);
        row.forEach(type => rowElement.appendChild(createElement('td', type)));
    });

    return table;
}

DOMDisplay.prototype.drawActors = function () {
    let actorsWrap = createElement('div');
    this.level.actors.map(actor => {
        let actorElement = createElement('div', `actor ${actor.type}`);
        let rect = actorsWrap.appendChild(actorElement);
        rect.style.width = actor.size.x * SCALE + 'px';
        rect.style.height = actor.size.y * SCALE + 'px';
        rect.style.left = actor.position.x * SCALE + 'px'; 
        rect.style.top = actor.position.y * SCALE + 'px';
    });
    
    return actorsWrap;
}

DOMDisplay.prototype.drawFrame = function () {
    if (this.actorsLayer) this.wrap.removeChild(this.actorsLayer);
    this.actorsLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = 'game ' + (this.level.status || '');
}

DOMDisplay.prototype.clear = function () {
    this.wrap.parentNode.removeChild(this.wrap);
}