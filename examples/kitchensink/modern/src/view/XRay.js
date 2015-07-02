Ext.define('KitchenSink.view.XRay', {
    alias: 'sprite.xray',
    extend: 'Ext.draw.sprite.Path',
    render: function (surface, ctx) {
        var attr = this.attr,
            mat = attr.matrix,
            imat = attr.inverseMatrix,
            path = attr.path,
            size = imat.x(2, 0) - imat.x(0, 0);
        if (attr.path.params.length === 0) {
            return;
        }
        mat.toContext(ctx);
        var i = 0, j = 0,
            commands = path.commands,
            params = path.params,
            ln = commands.length;

        ctx.beginPath();
        for (; i < ln; i++) {
            switch (commands[i]) {
                case "M":
                    ctx.moveTo(params[j], params[j + 1]);
                    j += 2;
                    break;
                case "L":
                    ctx.lineTo(params[j], params[j + 1]);
                    j += 2;
                    break;
                case "C":
                    ctx.bezierCurveTo(
                        params[j], params[j + 1],
                        params[j + 2], params[j + 3],
                        params[j + 4], params[j + 5]
                    );
                    j += 6;
                    break;
                case "Z":
                    ctx.closePath();
                    break;
                default:
            }
        }
        ctx.fillStroke(attr);

        mat.toContext(ctx);
        ctx.beginPath();
        for (i = 0, j = 0; i < ln; i++) {
            switch (commands[i]) {
                case "M":
                    ctx.moveTo(params[j] - size, params[j + 1] - size);
                    ctx.rect(params[j] - size, params[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                case "L":
                    ctx.moveTo(params[j] - size, params[j + 1] - size);
                    ctx.rect(params[j] - size, params[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                case "C":
                    ctx.moveTo(params[j] + size, params[j + 1]);
                    ctx.arc(params[j], params[j + 1], size, 0, Math.PI * 2, true);
                    j += 2;
                    ctx.moveTo(params[j] + size, params[j + 1]);
                    ctx.arc(params[j], params[j + 1], size, 0, Math.PI * 2, true);
                    j += 2;
                    ctx.moveTo(params[j] + size * 2, params[j + 1]);
                    ctx.rect(params[j] - size, params[j + 1] - size, size * 2, size * 2);
                    j += 2;
                    break;
                default:
            }
        }
        imat.toContext(ctx);
        ctx.strokeStyle = "black";
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 1;
        ctx.stroke();

        mat.toContext(ctx);
        ctx.beginPath();
        for (i = 0, j = 0; i < ln; i++) {
            switch (commands[i]) {
                case "M":
                    ctx.moveTo(params[j], params[j + 1]);
                    j += 2;
                    break;
                case "L":
                    ctx.moveTo(params[j], params[j + 1]);
                    j += 2;
                    break;
                case "C":
                    ctx.lineTo(params[j], params[j + 1]);
                    j += 2;
                    ctx.moveTo(params[j], params[j + 1]);
                    j += 2;
                    ctx.lineTo(params[j], params[j + 1]);
                    j += 2;
                    break;
                default:
            }
        }
        imat.toContext(ctx);
        ctx.lineWidth = 1 / 2;
        ctx.stroke();
    }
});