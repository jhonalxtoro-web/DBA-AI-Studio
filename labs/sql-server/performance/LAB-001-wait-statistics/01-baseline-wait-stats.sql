/*
    LAB-001 - SQL Server Wait Statistics
    01 - Baseline

    Objetivo:
    Obtener una fotografía inicial de las principales esperas
    acumuladas en la instancia SQL Server.

    IMPORTANTE:
    Las Wait Statistics son acumulativas desde el inicio de la
    instancia o desde el último reset de estadísticas.
*/

SELECT
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    signal_wait_time_ms,
    wait_time_ms - signal_wait_time_ms AS resource_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_time_ms > 0
ORDER BY wait_time_ms DESC;
