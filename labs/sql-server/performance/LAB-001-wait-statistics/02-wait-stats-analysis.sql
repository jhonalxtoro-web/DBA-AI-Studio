/*
    LAB-001 - SQL Server Wait Statistics
    02 - Wait Statistics Analysis

    Objetivo:
    Normalizar las principales esperas para facilitar el análisis.
*/

WITH WaitStats AS
(
    SELECT
        wait_type,
        waiting_tasks_count,
        wait_time_ms,
        signal_wait_time_ms,
        wait_time_ms - signal_wait_time_ms AS resource_wait_time_ms
    FROM sys.dm_os_wait_stats
    WHERE wait_time_ms > 0
),
Totals AS
(
    SELECT
        SUM(wait_time_ms) AS total_wait_time_ms
    FROM WaitStats
)
SELECT TOP (30)
    ws.wait_type,
    ws.waiting_tasks_count,
    ws.wait_time_ms,
    ws.signal_wait_time_ms,
    ws.resource_wait_time_ms,

    CAST(
        ws.wait_time_ms * 100.0 /
        NULLIF(t.total_wait_time_ms, 0)
        AS decimal(10,2)
    ) AS wait_percentage,

    CAST(
        ws.wait_time_ms * 1.0 /
        NULLIF(ws.waiting_tasks_count, 0)
        AS decimal(18,2)
    ) AS avg_wait_ms_per_task

FROM WaitStats AS ws
CROSS JOIN Totals AS t
ORDER BY ws.wait_time_ms DESC;
