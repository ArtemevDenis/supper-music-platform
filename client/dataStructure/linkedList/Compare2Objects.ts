function compare2Objects(x: any, y: any): boolean {
    return JSON.stringify(x) === JSON.stringify(y)
    //TODO: написать нормально сравнение объектов
}

export default compare2Objects