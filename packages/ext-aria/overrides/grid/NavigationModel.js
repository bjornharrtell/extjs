Ext.define('Ext.aria.grid.NavigationModel', {
    override: 'Ext.grid.NavigationModel',
    
    // WAI-ARIA recommends no wrapping around row ends in navigation mode
    preventWrap: true,
    
    // Move focus to the first cell of the current row,
    // as per http://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#grid
    onKeyHome: function(keyEvent) {
        var position, row, columns, firstCol, newPosition;
        
        position = this.getPosition();
        
        if (position && position.record) {
            row      = typeof position.row === 'number' ? position.row : position.rowIdx;
            columns  = keyEvent.view.getVisibleColumnManager();
            firstCol = columns.getHeaderIndex(columns.getFirst());
            
            newPosition = new Ext.grid.CellContext(keyEvent.view);
            
            if (newPosition) {
                newPosition.setPosition(row, firstCol);
                this.setPosition(newPosition, null, keyEvent);
            }
        }
    },
    
    // Move focus to the last cell of the current row,
    // as per http://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#grid
    onKeyEnd: function(keyEvent) {
        var position, row, columns, lastCol, newPosition;
        
        position = this.getPosition();
        
        if (position && position.record) {
            row     = typeof position.row === 'number' ? position.row : position.rowIdx;
            columns = keyEvent.view.getVisibleColumnManager();
            lastCol = columns.getHeaderIndex(columns.getLast());
            
            newPosition = new Ext.grid.CellContext(keyEvent.view);
            
            if (newPosition) {
                newPosition.setPosition(row, lastCol);
                this.setPosition(newPosition, null, keyEvent);
            }
        }
    }
});
