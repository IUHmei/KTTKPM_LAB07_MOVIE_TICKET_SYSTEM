function StatusBadge({ status }) {
    const normalized = (status || '').toUpperCase();

    return (
        <span className={`badge badge-${normalized.toLowerCase()}`}>
            {normalized || 'UNKNOWN'}
        </span>
    );
}

export default StatusBadge;