import { clsx } from 'clsx';

const SkeletonBase = ({ className, ...props }) => (
    <div
        className={clsx('animate-shimmer rounded-lg', className)}
        {...props}
    />
);

export const SkeletonText = ({ lines = 3, className }) => (
    <div className={clsx('space-y-3', className)}>
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonBase
                key={i}
                className="h-4 rounded-md"
                style={{ width: i === lines - 1 ? '60%' : '100%' }}
            />
        ))}
    </div>
);

export const SkeletonCard = ({ className }) => (
    <div className={clsx('rounded-2xl p-6 space-y-4 border border-border-light', className)}>
        <SkeletonBase className="h-40 w-full rounded-xl" />
        <SkeletonBase className="h-5 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
            <SkeletonBase className="h-8 w-24 rounded-lg" />
            <SkeletonBase className="h-8 w-20 rounded-lg" />
        </div>
    </div>
);

export const SkeletonTableRow = ({ cols = 5, className }) => (
    <tr className={className}>
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} className="py-4 px-6">
                <SkeletonBase className="h-4 w-full" />
            </td>
        ))}
    </tr>
);

export const SkeletonChart = ({ className }) => (
    <div className={clsx('rounded-2xl p-6 border border-border-light', className)}>
        <div className="flex justify-between items-center mb-6">
            <SkeletonBase className="h-6 w-40" />
            <div className="flex gap-2">
                <SkeletonBase className="h-8 w-16 rounded-lg" />
                <SkeletonBase className="h-8 w-16 rounded-lg" />
                <SkeletonBase className="h-8 w-16 rounded-lg" />
            </div>
        </div>
        <SkeletonBase className="h-64 w-full rounded-xl" />
    </div>
);

export const SkeletonAvatar = ({ size = 'md', className }) => {
    const sizes = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-16 w-16' };
    return <SkeletonBase className={clsx('rounded-full', sizes[size], className)} />;
};

export const SkeletonStat = ({ className }) => (
    <div className={clsx('rounded-2xl p-6 border border-border-light', className)}>
        <SkeletonBase className="h-4 w-20 mb-3" />
        <SkeletonBase className="h-8 w-32 mb-2" />
        <SkeletonBase className="h-3 w-24" />
    </div>
);

export default SkeletonBase;
