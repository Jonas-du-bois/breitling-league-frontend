/**
 * Table Components
 * 
 * Components for displaying structured data in rows and columns.
 * Essential for data management, reporting, and complex data visualization.
 */

// ===== EXISTING TABLE COMPONENTS =====

// Complete data table with header and body
export { default as DataTable } from './DataTable.vue'

// Table header row component
export { default as TableHeader } from './TableHeader.vue'

// Basic table row component
export { default as TableRow } from './TableRow.vue'

// Player row component
export { default as TableRowPlayer } from './TableRowPlayer.vue'

// Current user row component (highlighted)
export { default as TableRowCurrentUser } from './TableRowCurrentUser.vue'

// Table body with multiple rows
export { default as TableBody } from './TableBody.vue'

// Complete table group demo
export { default as TableGroup } from './TableGroup.vue'

/**
 * Usage Examples:
 * 
 * import { DataTable, TableHeader, TableRow } from '@/components/table'
 * 
 * <DataTable :data="tableData" />
 * <TableHeader :columns="columnConfig" />
 * <TableRow :rowData="rowData" />
 */
