class Light {
  constructor(name, Ia, Id, Is, p0) {
    this.name = name;
    this.Ia_ = Ia;
    this.Id_ = Id;
    this.Is_ = Is;
    this.p0_ = p0;
    this.on = true;
  }
  update(objects) {
    for (const object of objects) {
      object.lighting(this);
    }
  }
  toggle() {
    this.on = !this.on
  }
  Ia(i) {
    return this.on ? this.Ia_[i] : 0.0;
  }
  Is(i) {
    return this.on ? this.Is_[i] : 0.0;
  }
  Id(i) {
    return this.on ? this.Id_[i] : 0.0;
  }
  p0(i) {
    return this.on ? this.p0_[i] : 0.0;
  }
}
