Hooks.on("init", () => {
    // Override map notes to use the BackgroundlessControlIcon
    Note.prototype._drawControlIcon = function () {
        let tint = this.data.iconTint ? colorStringToHex(this.data.iconTint) : null;
        let icon = new BackgroundlessControlIcon({ texture: this.data.icon, size: this.size, tint: tint });
        icon.x -= this.size / 2;
        icon.y -= this.size / 2;
        return icon;
    };
});

export class BackgroundlessControlIcon extends ControlIcon {
    /**
     * Override ControlIcon#draw to remove drawing of the background.
     */
    async draw() {
        // Draw border
        this.border
            .clear()
            .lineStyle(2, this.borderColor, 1.0)
            .drawRoundedRect(...this.rect, 5)
            .endFill();
        this.border.visible = false;

        // Draw icon
        this.icon.texture = this.texture ?? (await loadTexture(this.iconSrc));
        this.icon.width = this.icon.height = this.size;
        this.icon.tint = Number.isNumeric(this.tintColor) ? this.tintColor : 0xffffff;
        return this;
    }
}
